from flask import jsonify, request, Blueprint
from models import db, Post, Group
from flask_jwt_extended import jwt_required, get_jwt_identity

post_bp = Blueprint("post_bp", __name__)

# ==================================POSTS======================================
# Add Post
@post_bp.route("/posts", methods=["POST"])
@jwt_required()
def add_post():
    data = request.get_json()

    # Get required fields
    content = data.get('content')
    group_id = data.get('group_id')
    
    # Check if content and group_id are provided
    if not content:
        return jsonify({"error": "Content is required"}), 400
    if not group_id:
        return jsonify({"error": "Group ID is required"}), 400

    # Get current user from JWT token
    current_user_id = get_jwt_identity()

    # Check if the group exists
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404

    # Create and add the new post
    new_post = Post(content=content, user_id=current_user_id, group_id=group_id)
    
    # Add and commit the new post to the database
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"success": "Post added successfully"}), 201


# READ - Get All Posts (No Group Filter)
@post_bp.route("/posts", methods=["GET"])
@jwt_required()
def get_all_posts():
    current_user_id = get_jwt_identity()

    # Retrieve all posts by the current user (or all posts if no user filter needed)
    posts = Post.query.filter_by(user_id=current_user_id).all()

    if not posts:
        return jsonify({"error": "No posts found for this user"}), 404

    post_list = [
        {
            "id": post.id,
            "content": post.content,
            "created_at": post.created_at,
            "group": {"id": post.group.id, "title": post.group.title}
        } for post in posts
    ]

    return jsonify(post_list), 200


# READ - Get Post by ID
@post_bp.route("/posts/<int:post_id>", methods=["GET"])
@jwt_required()
def get_post(post_id):
    current_user_id = get_jwt_identity()

    # Retrieve the post by ID and ensure the current user is the creator
    post = Post.query.filter_by(id=post_id, user_id=current_user_id).first()

    if not post:
        return jsonify({"error": "Post not found or unauthorized"}), 404

    post_details = {
        "id": post.id,
        "content": post.content,
        "created_at": post.created_at,
        "group": {"id": post.group.id, "title": post.group.title},
    }

    return jsonify(post_details), 200


# UPDATE - Update Post
@post_bp.route("/posts/<int:post_id>", methods=["PUT"])
@jwt_required()
def update_post(post_id):
    data = request.get_json()
    content = data.get('content')
    group_id = data.get('group_id')

    current_user_id = get_jwt_identity()

    # Retrieve post to be updated
    post = Post.query.get(post_id)
    
    if not post or post.user_id != current_user_id:
        return jsonify({"error": "Post not found or unauthorized"}), 404

    # Check if group exists
    if group_id:
        group = Group.query.get(group_id)
        if not group:
            return jsonify({"error": "Group not found"}), 404

    # Apply updates to the post
    post.content = content if content else post.content
    post.group_id = group_id if group_id else post.group_id

    db.session.commit()
    return jsonify({"success": "Post updated successfully"}), 200


# DELETE - Delete Post
@post_bp.route("/posts/<int:post_id>", methods=["DELETE"])
@jwt_required()
def delete_post(post_id):
    current_user_id = get_jwt_identity()

    # Retrieve the post to be deleted
    post = Post.query.filter_by(id=post_id, user_id=current_user_id).first()

    if not post:
        return jsonify({"error": "Post not found or unauthorized"}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({"success": "Post deleted successfully"}), 200
