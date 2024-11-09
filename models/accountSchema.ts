import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {  // This field seems to be missing in your input data
    type: String,
    required: true,  // Make sure this matches the data you are trying to send
  },
});

export const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);
