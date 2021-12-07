import { Request } from 'express';
import { User } from "@nx-boiler-plate/entities";

interface IRequestWithUser extends Request {
    user: User;
};

export default IRequestWithUser;