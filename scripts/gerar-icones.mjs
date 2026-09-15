/**
 * Gera o favicon e a imagem de compartilhamento da Fantoche, em SVG
 * desenhado aqui mesmo (a marca é tipo + a boia, não existe arquivo de
 * logo): app/icon.png (512) e app/apple-icon.png (180) com a boia sobre
 * o azul da água; public/og/site.jpg (1200x630) com a boia, o nome em
 * condensada e a linha da loja, o que aparece quando alguém manda o
 * link no WhatsApp.
 *
 *   node scripts/gerar-icones.mjs
 */
import fs from "node:fs";
import sharp from "sharp";

const AGUA = "#0a84c7";
const MARINHO = "#0b2d4f";
const RAIA = "#ffc53d";

const boia = (cx, cy, r) => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${RAIA}"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.5}" fill="${AGUA}"/>
  <g stroke="${MARINHO}" stroke-width="${r * 0.17}" stroke-linecap="round" opacity=".55">
    <path d="M${cx} ${cy - r}v${r * 0.5}M${cx} ${cy + r * 0.5}v${r * 0.5}M${cx - r} ${cy}h${r * 0.5}M${cx + r * 0.5} ${cy}h${r * 0.5}"/>
  </g>`;

async function icone(tamanho, destino) {
  const svg = Buffer.from(`<svg width="${tamanho}" height="${tamanho}" viewBox="0 0 512 512">
    <rect width="512" height="512" rx="96" fill="${AGUA}"/>
    ${boia(256, 256, 190)}
  </svg>`);
  await sharp(svg).png().toFile(destino);
  console.log(destino, tamanho);
}

async function og() {
  const L = 1200, A = 630;
  const svg = Buffer.from(`<svg width="${L}" height="${A}">
    <style>text{font-family:"Barlow Condensed","Arial Narrow","DIN Condensed",Arial,sans-serif;font-weight:700}</style>
    <rect width="${L}" height="${A}" fill="${AGUA}"/>
    <g opacity=".08" stroke="#fff" stroke-width="1">
      ${Array.from({ length: 26 }, (_, i) => `<path d="M${i * 48} 0v${A}"/>`).join("")}
      ${Array.from({ length: 14 }, (_, i) => `<path d="M0 ${i * 48}h${L}"/>`).join("")}
    </g>
    ${boia(250, 300, 110)}
    <text x="400" y="340" font-size="150" fill="#ffffff" letter-spacing="2">FANTOCHE</text>
    <g>${Array.from({ length: 30 }, (_, i) => `<circle cx="${406 + i * 22}" cy="378" r="5" fill="${i % 2 ? RAIA : "#ffffff"}"/>`).join("")}</g>
    <text x="404" y="440" font-size="38" fill="#ffffff" opacity=".9" font-weight="600">Artigos esportivos, natação e lazer em Indaiatuba</text>
    <text x="404" y="486" font-size="30" fill="${RAIA}" font-weight="600">Pedido pelo WhatsApp · retire na loja ou receba em casa</text>
  </svg>`);
  fs.mkdirSync("public/og", { recursive: true });
  await sharp(svg).jpeg({ quality: 92 }).toFile("public/og/site.jpg");
  console.log("public/og/site.jpg", L, A);
}

await icone(512, "app/icon.png");
await icone(180, "app/apple-icon.png");
await og();
