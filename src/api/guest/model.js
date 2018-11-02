import mongoose, { Schema } from 'mongoose'

const guestSchema = new Schema({
  name: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  status: {
    type: Number
  },
  avatar: {
    type: String
  },
  address: {
    type: String
  },
  code: {
    type: String
  },
  group: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

guestSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      phoneNumber: this.phoneNumber,
      status: this.status,
      avatar: this.avatar,
      address: this.address,
      code: this.code,
      group: this.group,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Guest', guestSchema)

export const schema = model.schema
export default model
