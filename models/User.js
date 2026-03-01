const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["client", "business"],
      default: "client",
    },
  },
  { timestamps: true },
);

// Хешування пароля перед збереженням
// Використовуємо async function без аргументу next
userSchema.pre("save", async function () {
  // Якщо пароль не змінювався (наприклад, при оновленні профілю) — виходимо
  if (!this.isModified("password")) {
    return;
  }

  // Генерація солі та хешування
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Метод для порівняння паролів (використовується при логіні)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
