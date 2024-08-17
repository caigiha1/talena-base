import { cvBankMockData } from "@/mocks/mockData.ts";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.all("*", async () => {
    await delay(500);
  }),
  http.get("/talent", () => {
    return HttpResponse.json(cvBankMockData);
  }),
  http.get("/talent", (req) => {
    const url = new URL(req.url);
    const talentId = url.searchParams.get("id");
    if (!talentId) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ talentId });
  }),
  http.post("/upload", async ({ request }) => {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return new HttpResponse("Missing document", { status: 400 });
    }

    if (!(file instanceof File)) {
      return new HttpResponse("Uploaded document is not a File", {
        status: 400,
      });
    }

    return HttpResponse.json({
      contents: await file.text(),
    });
  }),
];
