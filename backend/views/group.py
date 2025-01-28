from flask import jsonify, request, Blueprint
from models import db, User, Group
from flask_jwt_extended import jwt_required, get_jwt_identity

group_bp = Blueprint("group_bp", __name__)

# ==================================GROUPS======================================

# CREATE - Add Group
@group_bp.route("/group/add", methods=["POST"])
@jwt_required()
def add_group():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    title = data['title']
    description = data['description']

    # Check if the current user is valid
    current_user = User.query.get(current_user_id)
    if not current_user:
        return jsonify({"error": "User not found"}), 404

    # Create new group
    new_group = Group(title=title, description=description, created_by=current_user_id)
    db.session.add(new_group)
    db.session.commit()
    return jsonify({"success": "Group added successfully"}), 201


# READ - Get All Groups
@group_bp.route("/groups", methods=["GET"])
@jwt_required()
def get_groups():
    current_user_id = get_jwt_identity()

    groups = Group.query.filter_by(created_by=current_user_id)

    group_list = [
        {
            "id": group.id,
            "title": group.title,
            "description": group.description,
            "created_by": group.created_by,
            "creator": {"id": group.creator.id, "username": group.creator.username, "email": group.creator.email}
        } for group in groups
    ]

    return jsonify(group_list), 200


# READ - Get Group by ID
@group_bp.route("/group/<int:group_id>", methods=["GET"])
@jwt_required()
def get_group(group_id):
    current_user_id = get_jwt_identity()

    group = Group.query.filter_by(id=group_id, created_by=current_user_id).first()
    if group:
        group_details = {
            "id": group.id,
            "title": group.title,
            "description": group.description,
            "created_by": group.created_by
        }
        return jsonify(group_details), 200
    else:
        return jsonify({"error": "Group not found or Unauthorized"}), 406


# UPDATE - Update Group
@group_bp.route("/group/<int:group_id>", methods=["PUT"])
@jwt_required()
def update_group(group_id):
    current_user_id = get_jwt_identity()

    data = request.get_json()
    group = Group.query.get(group_id)

    if group and group.created_by == current_user_id:
        title = data.get('title', group.title)
        description = data.get('description', group.description)

        # Apply updates
        group.title = title
        group.description = description

        db.session.commit()
        return jsonify({"success": "Group updated successfully"}), 200
    else:
        return jsonify({"error": "Group not found or Unauthorized"}), 406


# DELETE - Delete Group
@group_bp.route("/group/<int:group_id>", methods=["DELETE"])
@jwt_required()
def delete_group(group_id):
    current_user_id = get_jwt_identity()

    group = Group.query.filter_by(id=group_id, created_by=current_user_id).first()

    if not group:
        return jsonify({"error": "Group not found or Unauthorized"}), 406

    db.session.delete(group)
    db.session.commit()
    return jsonify({"success": "Group deleted successfully"}), 200
