import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function sign(value: string) {
  const secret = process.env.SESSION_SECRET!;
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionToken() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const expected = sign(issuedAt);
  const expectedBuf = Buffer.from(expected);
  const signatureBuf = Buffer.from(signature);
  if (expectedBuf.length !== signatureBuf.length) return false;
  if (!timingSafeEqual(expectedBuf, signatureBuf)) return false;

  const age = Date.now() - Number(issuedAt);
  return age >= 0 && age <= MAX_AGE_SECONDS * 1000;
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
