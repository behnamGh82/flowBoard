import bcrypt from 'bcryptjs'
import mongoose, { Schema } from 'mongoose'
import type { IUser } from '../types'

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    avatar: { type: String },
    role: {
      type: String,
      enum: ['admin', 'project_manager', 'developer'],
      default: 'developer',
    },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true },
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password)
}

userSchema.set('toJSON', {
  transform(_doc, ret) {
    const { password: _password, ...rest } = ret
    return rest
  },
})

export const User = mongoose.model<IUser>('User', userSchema)
