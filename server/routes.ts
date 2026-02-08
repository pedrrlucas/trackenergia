import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getInstagramPosts } from "./instagram";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.get("/api/instagram/posts", async (_req, res) => {
    try {
      const posts = await getInstagramPosts();
      return res.json({ posts });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao buscar posts do Instagram";
      return res.status(500).json({ error: message, posts: [] });
    }
  });

  return httpServer;
}
