import { PaperTexture } from "./paper-texture";

export function EnvelopeBody() {
  return (
    <>
      <div className="envelope-back"><PaperTexture /></div>
      <div className="envelope-pocket"><PaperTexture /></div>
      <div aria-hidden className="envelope-fold envelope-fold-left" />
      <div aria-hidden className="envelope-fold envelope-fold-right" />
      <div aria-hidden className="envelope-fold envelope-fold-bottom" />
    </>
  );
}
