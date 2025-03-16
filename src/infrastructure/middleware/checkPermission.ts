import { NextFunction, Response, Request } from "express";

export function checkPermission(permission: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = req.user

        if (!user || !user.permissions.includes(permission)) {
            res.status(403).json({ message: 'Permission denied' });
            return
        }
        next();
    };
}
