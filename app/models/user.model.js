module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            user_name: String,
            email: String,
           
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const User = mongoose.model("user", schema);
    return User;
};