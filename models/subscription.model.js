import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        // 🔑 OWNER (VERY IMPORTANT)
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: [true, 'Subscription name is required'],
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        price: {
            type: Number,
            required: [true, 'Subscription price is required'],
            min: [0, 'Price must be greater than 0'],
            max: [1000, 'Price must be less than 1000'],
        },

        currency: {
            type: String,
            enum: ['USD', 'EUR', 'GBP'],
            default: 'USD',
        },

        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'yearly'],
            default: 'monthly',
        },

        startDate: {
            type: Date,
            required: true,
            default: () => new Date(),
        },

        renewalDate: {
            type: Date,
        },

        status: {
            type: String,
            enum: ['active', 'expired', 'cancelled'],
            default: 'active',
        },
    },
    { timestamps: true }
);

subscriptionSchema.pre('save', function () {
    const renewalPeriods = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365,
    };

    // Ensure startDate
    if (!this.startDate) {
        this.startDate = new Date();
    }

    // Auto-calculate renewalDate
    if (!this.renewalDate) {
        const daysToAdd =
            renewalPeriods[this.frequency] ?? renewalPeriods.monthly;

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(
            this.renewalDate.getDate() + daysToAdd
        );
    }

    // Auto-expire
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
