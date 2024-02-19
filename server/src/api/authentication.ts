import { Hono } from "hono";
import { AuthenticationService } from "../service/authentication-service";

const authenticaton = new Hono();
const authenticationService = new AuthenticationService();

authenticaton.post("/login", async (c): Promise<any> => {
    const body = await c.req.json();
    return authenticationService.login(body.email, body.password);
})

authenticaton.post("/register", async (c): Promise<any> => {
    const body = await c.req.json();
    const data = await authenticationService.register(body);
    return c.text(data, 201)
})

export default authenticaton