from flask import jsonify, request, Blueprint
from models import db, User, Tags, Todo
from flask_jwt_extended import jwt_required, get_jwt_identity

todo_bp= Blueprint("todo_bp", __name__)

# ==================================TO--DO======================================

@todo_bp.route("/todo/add", methods=["POST"])
@jwt_required()
def add_todo():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    title = data['title']
    description = data['description']
    tag_id = data['tag_id']
    deadline = data['deadline']

    check_tag_id =Tags.query.get(tag_id)

    if not check_tag_id:
        return jsonify({"error":"Tag/user doesn't exists"}),406

    else:
        new_todo = Todo(title=title, description=description,user_id=current_user_id, tag_id=tag_id, deadline=deadline)
        db.session.add(new_todo)
        db.session.commit()
        return jsonify({"success":"Todo added successfully"}), 201

    
# Assignment
# add delete/update/fetch all todos/ fetch 1 todo
# READ - Get All Todos)
@todo_bp.route("/todos", methods=["GET"])
@jwt_required()
def get_todos():
    current_user_id = get_jwt_identity()

    todos = Todo.query.filter_by(user_id = current_user_id)

    todo_list = [
        {
            "id": todo.id,
            "title": todo.title,
            "description": todo.description,
            "user_id": todo.user_id,
            "tag_id": todo.tag_id,
            "is_complete": todo.is_complete,
            "deadline": todo.deadline,
            "user": {"id":todo.user.id, "username": todo.user.username, "email": todo.user.email},
            "tag": {"id": todo.tag.id, "name":todo.tag.name}
        } for todo in todos
    ]    

    return jsonify(todo_list), 200
    

# READ - Get Todo by ID
@todo_bp.route("/todo/<int:todo_id>", methods=["GET"])
@jwt_required()
def get_todo(todo_id):
    current_user_id = get_jwt_identity()

    todo = Todo.query.filter_by(id=todo_id, user_id=current_user_id).first()
    if todo:
        todo_details = {
            "id": todo.id,
            "title": todo.title,
            "description": todo.description,
            "user_id": todo.user_id,
            "tag_id": todo.tag_id,
            "deadline": todo.deadline
        }
        return jsonify(todo_details), 200
    
    else:
        return jsonify({"error": "Todo not found"}), 406

# UPDATE
@todo_bp.route("/todo/<int:todo_id>", methods=["PUT"])
@jwt_required()
def update_todo(todo_id):
    current_user_id = get_jwt_identity()

    data = request.get_json()
    todo = Todo.query.get(todo_id)

    if todo and todo.user_id==current_user_id:

        title = data.get('title', todo.title)
        description = data.get('description', todo.description)
        is_complete=data.get('is_complete', todo.is_complete)
        tag_id = data.get('tag_id',todo.tag_id)
        deadline = data.get('deadline',todo.deadline)

        check_tag_id =User.query.get(tag_id)

    
        if not check_tag_id :
            return jsonify({"error":"Tag/user doesn't exists"}),406


        else:
            # Apply updates
            todo.title = title
            todo.description = description
            todo.tag_id = tag_id
            todo.deadline = deadline
            todo.is_complete = is_complete

            db.session.commit()
            return jsonify({"success": "Todo updated successfully"}), 200

    else:
        return jsonify({"error": "Todo not found/Unauthorized"}), 406


# DELETE
@todo_bp.route("/todo/<int:todo_id>", methods=["DELETE"])
@jwt_required()
def delete_todo(todo_id):
    current_user_id = get_jwt_identity()

    todo = Todo.query.filter_by(id=todo_id, user_id=current_user_id).first()

    if not todo:
        return jsonify({"error": "Todo not found/Unauthorized"}), 406


    db.session.delete(todo)
    db.session.commit()
    return jsonify({"success": "Todo deleted successfully"}), 200