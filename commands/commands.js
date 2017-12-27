use kpizza_db
db.createUser(
  {
    user: "kpizza_user",
    pwd: "abc123",
    roles: [
       { role: "readWrite", db: "kpizza_db" }
    ]
  }
)
  
  
db.getCollection('customers').find({})