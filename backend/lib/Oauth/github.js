import {GitHub} from "arctic"
import { env } from "../../config/env.js"
export const github=new GitHub(
    env.GITHUB_CLIENT_ID,
    env.GITHUB_CLIENT_SECRET_KEY,
    "http://localhost:5000/api/v1/auth/github/callback"
)