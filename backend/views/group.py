from flask import jsonify, request, Blueprint
from models import db, Group
from flask_jwt_extended import jwt_required, get_jwt_identity

group_bp = Blueprint("group_bp", __name__)


# CREATE - Add Group
@group_bp.route("/group/add", methods=["POST"])
@jwt_required()
def add_group():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    # Validate the presence of required fields
    title = data.get('title')
    description = data.get('description')

    if not title:
        return jsonify({"error": "Title is required"}), 422

    if not description:
        return jsonify({"error": "Description is required"}), 422

    # Optional field, we use .get() to avoid errors if it's not provided
    media_url = data.get('media_url', "")  # Set the default URL if not provided

    # Create the new group
    new_group = Group(title=title, description=description, created_by=current_user_id, media_url=media_url)

    # Add and commit the new group to the database
    try:
        db.session.add(new_group)
        db.session.commit()
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": f"An error occurred while adding the group: {str(e)}"}), 500

    return jsonify({"success": "Group added successfully"}), 201


    # READ - Get All Groups
@group_bp.route("/groups", methods=["GET"])
@jwt_required()
def get_all_groups():
    current_user_id = get_jwt_identity()

    # Retrieve all groups created by the current user
    groups = Group.query.filter_by(created_by=current_user_id).all()

    if not groups:
        return jsonify({"error": "No groups found"}), 404

    group_list = [
        {
            "id": group.id,
            "title": group.title,
            "description": group.description,
            "media_url": group.media_url,  # Make sure media_url is included here
            "created_by": group.created_by
        } for group in groups
    ]

    return jsonify(group_list), 200


# UPDATE - Update Group
@group_bp.route("/group/<int:group_id>", methods=["PUT"])
@jwt_required()
def update_group(group_id):
    data = request.get_json()
    current_user_id = get_jwt_identity()

    group = Group.query.get(group_id)
    if group and group.created_by == current_user_id:
        group.title = data.get('title', group.title)
        group.description = data.get('description', group.description)
        
        # If no new media_url is provided, retain the current one, else use the provided one or the default
        group.media_url = data.get('media_url', group.media_url) 
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"An error occurred while updating the group: {str(e)}"}), 500

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

    try:
        db.session.delete(group)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"An error occurred while deleting the group: {str(e)}"}), 500

    return jsonify({"success": "Group deleted successfully"}), 200

