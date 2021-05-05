const { Schema, model, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, 'Contact name is required'] },
    email: { type: String, required: [true, 'Contact email is required'] },
    phone: { type: String, required: [true, 'Contact phone is required'] },
    favorite: {
      type: Boolean,
      default: false
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

contactSchema.plugin(mongoosePaginate)

const Contact = model('contacts', contactSchema)

module.exports = Contact
