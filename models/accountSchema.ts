// models/accountSchema.ts
import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  categories: [{
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  }]
}, {
  timestamps: true,
  // This will help us see what's actually being saved
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});



export const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);