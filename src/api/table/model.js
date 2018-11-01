import mongoose, { Schema } from 'mongoose'

const tableSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  total: {
    type: Number
  },
  seats: [{
    type: Schema.Types.ObjectId,
    ref: 'Guest'
  }],
  checkedInSeats: [{
    type: Schema.Types.ObjectId,
    ref: 'Guest'
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

tableSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy.view(full),
      name: this.name,
      total: this.total,
      seats: this.seats.map(s => s.view(full)),
      checkedInSeats: this.checkedInSeats.map(s => s.view(full)),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Table', tableSchema)

export const schema = model.schema
export default model
