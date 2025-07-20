// app/api/inngest/route.js
import { serve } from "inngest/next";
import { Inngest } from "inngest";

// Step 1: Create an Inngest client
const inngest = new Inngest({ name: "QuickCart App" });

// Step 2: Create a test function
const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello" },
  async ({ event }) => {
    return { message: "Hello from Inngest route!" };
  }
);

// Step 3: Export API handlers (App Router style)
export const { GET, POST, PUT } = serve(inngest, [helloWorld]);
