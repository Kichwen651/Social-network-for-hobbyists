from flask import jsonify, request, Blueprint
from models import db, Post, User, Group
from flask_jwt_extended import jwt_required, get_jwt_identity

post_bp = Blueprint("post_bp", __name__)

# ==================================POSTS======================================

# Add Post
@post_bp.route("/posts", methods=["POST"])
@jwt_required()
def add_post():
    data = request.get_json()
    content = data['content']
    media_url = data.get('media_url')  # Optional field
    group_id = data['group_id']

    # Get current user from JWT token
    current_user_id = get_jwt_identity()

    # Check if group exists
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404

    # Create and add new post
    new_post = Post(content=content, media_url=media_url, user_id=current_user_id, group_id=group_id)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"success": "Post added successfully"}), 201


# READ - Get All Posts
@post_bp.route("/posts", methods=["GET"])
@jwt_required()
def get_posts():
    current_user_id = get_jwt_identity()
    
    # Retrieve posts created by the current user
    posts = Post.query.filter_by(user_id=current_user_id).all()

    post_list = [
        {
            "id": post.id,
            "content": post.content,
            "media_url": post.media_url,
            "created_at": post.created_at,
            "group": {"id": post.group.id, "title": post.group.title},
            "user": {"id": post.user.id, "username": post.user.username}
        } for post in posts
    ]
    
    return jsonify(post_list), 200


# Read - Get Post by ID
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
        "media_url": post.media_url,
        "created_at": post.created_at,
        "group": {"id": post.group.id, "title": post.group.title},
        "user": {"id": post.user.id, "username": post.user.username}
    }

    return jsonify(post_details), 200


# UPDATE
@post_bp.route("/posts/<int:post_id>", methods=["PUT"])
@jwt_required()
def update_post(post_id):
    data = request.get_json()
    content = data.get('content')
    media_url = data.get('media_url')
    group_id = data.get('group_id')

    current_user_id = get_jwt_identity()

    # Retrieve post to be updated
    post = Post.query.get(post_id)
    
    if not post or post.user_id != current_user_id:
        return jsonify({"error": "Post not found or unauthorized"}), 404

    # Check if group exists
    group = Group.query.get(group_id)
    if group_id and not group:
        return jsonify({"error": "Group not found"}), 404

    # Apply updates to the post
    post.content = content if content else post.content
    post.media_url = media_url if media_url else post.media_url
    post.group_id = group_id if group_id else post.group_id

    db.session.commit()
    return jsonify({"success": "Post updated successfully"}), 200


# DELETE
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
