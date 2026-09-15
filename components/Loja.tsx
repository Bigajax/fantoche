import { Icone } from "./Icones";
import { site } from "@/data/site.config";

/**
 * A loja física, em chão piscina-claro: endereço, WhatsApp, horário
 * quando a loja passar, o botão de chamar e o de chegar, e o mapa do
 * Google embutido. É o que faz "retire na loja" ser uma promessa.
 */
export function Loja({ linkWhats, horario }: { linkWhats: string; horario?: string }) {
  return (
    <section id="loja" aria-labelledby="loja-titulo" className="mt-12 scroll-mt-24 bg-piscina lg:mt-16">
      <div className="miolo grid gap-8 py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:py-14">
        <div>
          <p className="etiqueta">A loja</p>
          <h2 id="loja-titulo" className="secao mt-2">
            Retire na loja ou receba em casa
          </h2>
          <span className="raia raia--curta mt-4" aria-hidden="true" />
          <p className="falada mt-4 max-w-[52ch] text-[1.0625rem] text-tinta-fraca">
            A Fantoche fica no Jardim Morada do Sol, em Indaiatuba. Você escolhe aqui, manda no WhatsApp e combina com a loja: retira pessoalmente ou recebe em casa, com parcelamento em até 3x sem juros.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <Icone nome="pino" className="mt-0.5 h-6 w-6 shrink-0 text-agua" peso={1.4} />
              <div>
                <dt className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-tinta-fraca">Endereço</dt>
                <dd className="mt-0.5 text-[0.9375rem] text-tinta">{site.endereco}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Icone nome="conversa" className="mt-0.5 h-6 w-6 shrink-0 text-agua" peso={1.4} />
              <div>
                <dt className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-tinta-fraca">WhatsApp</dt>
                <dd className="mt-0.5 text-[0.9375rem] text-tinta">(19) 99535-7103</dd>
              </div>
            </div>
            {horario ? (
              <div className="flex gap-3 sm:col-span-2">
                <Icone nome="loja" className="mt-0.5 h-6 w-6 shrink-0 text-agua" peso={1.4} />
                <div>
                  <dt className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-tinta-fraca">Horário</dt>
                  <dd className="mt-0.5 text-[0.9375rem] text-tinta">{horario}</dd>
                </div>
              </div>
            ) : null}
          </dl>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--raia">
              <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
              Falar com a loja
            </a>
            <a href={site.maps} target="_blank" rel="noreferrer" className="btn btn--linha">
              Como chegar
            </a>
          </div>
        </div>
        <div className="cartao overflow-hidden">
          <iframe title="Mapa: Fantoche, Indaiatuba" src={`https://www.google.com/maps?q=${encodeURIComponent("Seraphin Gilberto Candello, 1025, Jardim Morada do Sol, Indaiatuba - SP, 13348-334")}&output=embed`} width="100%" height="320" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full" />
        </div>
      </div>
    </section>
  );
}
