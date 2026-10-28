import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true,
    },
    dosage: {
      type: String,
      default: '1 tablet',
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Time slot is required (e.g. 8:00 AM)'],
      trim: true,
    },
    purpose: {
      type: String,
      default: 'Daily Wellness',
      trim: true,
    },
    timingDetail: {
      type: String,
      default: 'After Meals',
      trim: true,
    },
    status: {
      type: String,
      enum: ['taken', 'upcoming', 'missed'],
      default: 'upcoming',
    },
    icon: {
      type: String,
      default: '💊',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model('Medicine', medicineSchema);

