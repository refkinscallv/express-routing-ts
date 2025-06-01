'use strict'

/**
 * @module express-routing-ts
 * @description Laravel-style routing system for Express.js using TypeScript.
 * @author Refkinscallv
 * @repository https://github.com/refkinscallv/express-routing-ts
 * @version 1.0.0
 * @date 2025
 */

import { Request, Response, NextFunction } from 'express'

/**
 * Middleware function type for Express routes.
 */
export type RouteMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void

/**
 * HTTP methods supported by the routing system.
 */
export type RouteMethod =
    | 'get'
    | 'post'
    | 'put'
    | 'patch'
    | 'delete'
    | 'options'
    | 'head'
    | 'all'

/**
 * HTTP context passed to route handlers.
 */
export type HttpContext = {
    req: Request
    res: Response
    next: NextFunction
}

/**
 * Route handler can be a function or a [Controller, method] tuple.
 */
export type RouteHandler = ((params: HttpContext) => any) | [any, string]

/**
 * Route definition interface.
 */
export interface RouteDefinition {
    methods: RouteMethod[]
    path: string
    handler: RouteHandler
    middlewares?: RouteMiddleware[]
}
