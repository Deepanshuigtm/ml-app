from flask import request, Flask, jsonify, make_response, request
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
from transformers import pipeline
import whisper
import os

app = Flask(__name__)
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)
# oracle = pipeline(model="deepset/roberta-base-squad2")

# class User(db.Model):
#     __tablename__ = "user"
#     id = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String(80),unique = True, nullable = False)
#     email = db.Column(db.String(120), unique = True, nullable = False)

#     def json(self):
#         return {'id':self.id, 'name':self.name, 'email':self.email}
    
# db.create_all()

# test
@app.route('/test',methods = ['GET'])
def test():
    return jsonify({'message': 'The server is running'})

# create user
# @app.route('/api/flask/users', methods = ['POST'])
# def create_user():
#     try:
#         data = request.get_json()
#         new_user = User(name = data['name'], email = data['email'])
#         db.session.add(new_user)
#         db.session.commit()

#         return jsonify({
#             'id': new_user.id,
#             'name':new_user.name,
#             'email':new_user.email
#         }), 201
#     except Exception as e:
#         return make_response(({'message': 'error createing user ', 'error':str(e)}), 500)
    
# get all user
# @app.route('/api/flask/users', methods = ['GET'])
# def get_users():
#     try:
#         users = User.query.all()
#         user_data = [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]

#         return jsonify(user_data), 200

#     except Exception as e:
#         return make_response(({'message': 'error getting users', 'error': str(e)}), 500)
    
# get a user with id
# @app.route("/api/flask/users/<int:id>", methods=['GET'])
# def get_user(id):
#     try:
#         user = User.query.filter_by(id=id).first()
#         if user:
#             return make_response(jsonify({'user':user.json()}), 200)
#         return make_response(jsonify({'message':'user not found'}), 404)
#     except Exception as e:
#         return make_response(({'message': 'error getting user', 'error': str(e)}), 500)

# update user
# @app.route('/api/flask/users/<int:id>', methods=['PUT'])
# def update_user(id):
#   print('dsfesdfe')
#   try:
#     user = User.query.filter_by(id=id).first()
#     if user:
#       data = request.get_json()
#       user.name = data['name']
#       user.email = data['email']
#       db.session.commit()
#       return make_response(jsonify({'message': 'user updated'}), 200)
#     return make_response(jsonify({'message': 'user not found'}), 404)
#   except Exception as e:
#         return make_response(({'message': 'error updating user', 'error':str(e)}),500)

# delete user 
# @app.route('/api/flask/user/<int:id>', methods=['DELETE'])
# def delete_user(id):
    
#     try:
#         user = User.query.filter_by(id=id).first()

#         if user:
#             db.session.delete(user)
#             db.session.commit()
#             return make_response(jsonify({'message': 'user deleted sucefully'}), 200)
#         return make_response(jsonify({'message':'user not found'}), 404)
#     except Exception as e:
#         return make_response(({'message': 'error deleting user', 'error':str(e)}),500)

# for ml answering
@app.route('/api/flask/answering', methods = ['POST'])
def answering_api():
    print("hii")
    if 'file' not in request.files:
        return 'No file part', 400
    
    file = request.files['file']
    
    save_dir = os.path.join(os.path.dirname(__file__), 'data')
    os.makedirs(save_dir, exist_ok=True) 
    save_path = os.path.join(save_dir, file.filename)
    
    file.save(save_path)
    print(save_path)
    import whisper

    model = whisper.load_model("base")
    result = model.transcribe(save_path)
    text = result["text"]
    print(text)

    return jsonify({
        'answer': text
    }), 201

@app.route('/api/flask/answer/text', methods = ['POST'])
def answerApi():
    data = request.get_json()
    question = data['question']
    context = data['context']
    oracle = pipeline(model="deepset/roberta-base-squad2")
    ans = oracle(question=question, context=context)
    print(ans)
    return jsonify({
            'answer':ans
        }), 201