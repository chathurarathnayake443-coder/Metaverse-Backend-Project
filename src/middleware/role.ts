import { Response, NextFunction } from "express"
import { AuthRequest } from "./auth"

export const authorize = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized !..." })
        }

        const userRoles: string[] = req.user.roles || []
        const hasRole = allowedRoles.some((role) => userRoles.includes(role))

        if (!hasRole) {
            return res.status(403).json({ message: "Access Denied !..." })
        }

        next()
    }
}