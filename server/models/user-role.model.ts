import { model, Schema } from 'mongoose';

const UserRoleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Role property is required ...']
    }
}, { timestamps: true });

export const userRoleSchema = UserRoleSchema;

export const UserRole = model('user-role', UserRoleSchema);
