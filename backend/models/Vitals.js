import mongoose from 'mongoose';

const vitalsSchema = new mongoose.Schema(
  {
    heartRate: {
      type: Number,
      default: 72,
    },
    bloodPressure: {
      type: String,
      default: '120/80',
      trim: true,
    },
    spo2: {
      type: Number,
      default: 98,
    },
    healthScore: {
      type: Number,
      default: 85,
    },
    memberName: {
      type: String,
      default: 'Self',
      trim: true,
    },
    notes: {
      type: String,
      default: 'Normal readings',
      trim: true,
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

export default mongoose.model('Vitals', vitalsSchema);

