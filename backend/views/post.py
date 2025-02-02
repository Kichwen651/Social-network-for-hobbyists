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

    # Optional field (media_url)
    media_url = data.get('media_url')

    # Get current user from JWT token
    current_user_id = get_jwt_identity()

    # Check if the group exists
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404

    # Create and add the new post
    new_post = Post(content=content, media_url=media_url, user_id=current_user_id, group_id=group_id)
    
    # Add and commit the new post to the database
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"success": "Post added successfully"}), 201


# READ - Get All Posts by User ID
@post_bp.route("/user/<int:user_id>/posts", methods=["GET"])
@jwt_required()
def get_posts_by_user(user_id):
    current_user_id = get_jwt_identity()

    # Ensure that the logged-in user can only view their own posts
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized access to another user's posts"}), 403

    # Retrieve posts for the specific user ID
    posts = Post.query.filter_by(user_id=user_id).all()

    if not posts:
        return jsonify({"error": "No posts found for this user"}), 404

    post_list = [
        {
            "id": post.id,
            "content": post.content,
            "media_url": post.media_url,
            "created_at": post.created_at,
            "group": {"id": post.group.id, "title": post.group.title}
        } for post in posts
    ]

    return jsonify(post_list), 200


# READ - Get All Posts by Group ID (No User Membership Check)
@post_bp.route("/group/<int:group_id>/posts", methods=["GET"])
@jwt_required()
def get_posts_by_group(group_id):
    # Retrieve the group to check if it exists
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404  # Return error if group doesn't exist

    # Retrieve all posts from the specified group
    posts = Post.query.filter_by(group_id=group_id).all()

    if not posts:
        return jsonify({"error": "No posts found for this group"}), 404  # Return error if no posts are found

    # Format the posts to include group details
    post_list = [
        {
            "id": post.id,
            "content": post.content,
            "media_url": post.media_url,
            "created_at": post.created_at,
            "group": {"id": post.group.id, "title": post.group.title}
        } for post in posts
    ]

    return jsonify(post_list), 200  # Return posts for the group in response


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
        "media_url": post.media_url,
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