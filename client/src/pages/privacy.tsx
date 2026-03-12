import React, { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main>
        <article className="container-page max-w-[960px] mx-auto pb-16 lg:pb-24 pt-24 sm:pt-32 lg:pt-36">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 transition hover:text-zinc-950"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
            Voltar para a página inicial
          </Link>

          <header className="mb-12 lg:mb-16 mt-8 sm:mt-12">
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
              Política de Privacidade
            </h1>
            <p className="mt-4 text-sm text-zinc-500">
              Última atualização: março de 2025
            </p>
          </header>

          <div className="prose prose-lg prose-zinc max-w-none text-zinc-600 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-zinc-900">1. Introdução</h2>
              <p>
                A Track Energia (“nós”, “nos” ou “empresa”) tem o compromisso de respeitar e proteger 
                a privacidade de todos os usuários que acessam seu site e utiliza seus serviços. 
                Esta Política de Privacidade (“Política”) descreve como coletamos, utilizamos, 
                armazenamos e protegemos os dados pessoais dos visitantes e usuários, em conformidade 
                com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD) e demais 
                normativas aplicáveis à proteção de dados no Brasil.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">2. Controlador e Encarregado</h2>
              <p>
                O controlador dos dados pessoais coletados através deste site é a Track Energia, 
                com sede em Uberlândia, Estado de Minas Gerais. Para questões relacionadas à 
                proteção de dados, incluindo o exercício de direitos do titular, o usuário pode 
                entrar em contato através dos canais disponibilizados na página de contato do Site, 
                indicando no assunto “Proteção de Dados – LGPD”.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">3. Dados Coletados</h2>
              <p>
                Podemos coletar os seguintes tipos de dados pessoais:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <strong>Dados de identificação:</strong> nome completo, e-mail, telefone, 
                  endereço e demais informações fornecidas voluntariamente através do formulário 
                  de contato ou solicitação de proposta.
                </li>
                <li>
                  <strong>Dados de navegação:</strong> endereço IP, tipo de navegador, sistema 
                  operacional, páginas visitadas, tempo de permanência, origem do acesso e 
                  interações com o Site, coletados por meio de cookies e tecnologias similares.
                </li>
                <li>
                  <strong>Dados de empresa:</strong> razão social, CNPJ, cargo e área de atuação, 
                  quando fornecidos no contexto de solicitação de serviços ou parcerias comerciais.
                </li>
              </ul>
              <p className="mt-4">
                O fornecimento de dados pessoais é facultativo; entretanto, a recusa em fornecer 
                informações necessárias para a prestação de serviços ou o atendimento de 
                solicitações poderá impedir a conclusão do serviço ou o atendimento adequado.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">4. Finalidades do Tratamento</h2>
              <p>
                Os dados pessoais são tratados para as seguintes finalidades:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Atendimento a solicitações de contato e de propostas comerciais;</li>
                <li>Envio de informações sobre produtos, serviços e novidades da empresa, 
                    quando autorizado pelo titular;</li>
                <li>Elaboração de propostas e contratos de prestação de serviços;</li>
                <li>Melhoria da experiência de navegação e funcionalidades do Site;</li>
                <li>Análise estatística e métricas de acesso, de forma agregada e anonimizada;</li>
                <li>Cumprimento de obrigações legais e regulatórias;</li>
                <li>Exercício regular de direitos em processos judiciais, administrativos ou arbitrais;</li>
                <li>Proteção da vida ou incolumidade física do titular ou de terceiros;</li>
                <li>Prevenção à fraude e garantia da segurança da informação.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">5. Base Legal</h2>
              <p>
                O tratamento de dados pessoais baseia-se nas hipóteses previstas no art. 7º da LGPD, 
                especialmente: (a) consentimento do titular; (b) execução de contrato ou procedimentos 
                preliminares; (c) cumprimento de obrigação legal ou regulatória; (d) proteção da vida 
                ou incolumidade física; (e) tutela da saúde; (f) legítimo interesse do controlador, 
                observados os direitos e liberdades fundamentais do titular; (g) exercício regular 
                de direitos; (h) proteção ao crédito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">6. Compartilhamento de Dados</h2>
              <p>
                Os dados pessoais poderão ser compartilhados com terceiros nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Prestadores de serviços que atuam em nome da Track Energia (ex.: hospedagem, 
                    análise de dados, ferramentas de marketing), mediante contrato que garanta 
                    conformidade com a LGPD;</li>
                <li>Autoridades públicas, quando exigido por lei ou ordem judicial;</li>
                <li>Parceiros comerciais, exclusivamente para finalidades previamente informadas 
                    e com o consentimento do titular, quando exigido.</li>
              </ul>
              <p className="mt-4">
                Não realizamos a venda de dados pessoais. Eventual transferência internacional de 
                dados somente ocorrerá para países que ofereçam grau de proteção adequado ou mediante 
                garantias previstas na legislação.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">7. Cookies e Tecnologias Similares</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar a navegação, analisar o 
                uso do Site e personalizar conteúdo. Os cookies podem ser: (a) <strong>essenciais</strong> – 
                necessários ao funcionamento do Site; (b) <strong>analíticos</strong> – para medir 
                audiência e desempenho; (c) <strong>funcionais</strong> – para lembrar preferências 
                do usuário. O usuário pode gerenciar ou bloquear cookies pelas configurações do 
                navegador, podendo impactar a funcionalidade do Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">8. Retenção e Segurança</h2>
              <p>
                Os dados pessoais são mantidos pelo tempo necessário para cumprir as finalidades 
                para as quais foram coletados, incluindo o período exigido para cumprimento de 
                obrigações legais, contábeis e fiscais. Após o término do prazo de retenção, os 
                dados serão eliminados ou anonimizados. Adotamos medidas técnicas e organizacionais 
                apropriadas para proteger os dados contra acesso não autorizado, alteração, 
                divulgação ou destruição, em conformidade com as melhores práticas de segurança da 
                informação.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">9. Direitos do Titular</h2>
              <p>
                Em conformidade com o art. 18 da LGPD, o titular dos dados possui os seguintes direitos:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Confirmação da existência de tratamento;</li>
                <li>Acesso aos dados;</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em 
                    desconformidade com a lei;</li>
                <li>Portabilidade dos dados a outro fornecedor de serviço ou produto;</li>
                <li>Informação sobre compartilhamento e possibilidade de negativa do consentimento;</li>
                <li>Revogação do consentimento.</li>
              </ul>
              <p className="mt-4">
                O exercício dos direitos pode ser realizado através dos canais de contato indicados 
                nesta Política. A empresa responderá em prazo razoável, conforme estabelecido na LGPD. 
                O titular também pode encaminhar reclamação à Autoridade Nacional de Proteção de 
                Dados (ANPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">10. Menores</h2>
              <p>
                O Site não é destinado a menores de 18 (dezoito) anos. Não coletamos intencionalmente 
                dados de menores. Caso tomemos conhecimento de que dados de menores foram coletados 
                inadvertidamente, procederemos à eliminação em conformidade com a legislação.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">11. Alterações</h2>
              <p>
                Esta Política pode ser atualizada periodicamente para refletir mudanças em nossas 
                práticas ou na legislação. A versão vigente será sempre publicada no Site, com 
                indicação da data da última atualização. Recomendamos a leitura periódica desta 
                Política. O uso continuado do Site após alterações constitui aceitação da Política 
                atualizada.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">12. Contato</h2>
              <p>
                Para exercer seus direitos, esclarecer dúvidas ou comunicar incidentes de 
                segurança envolvendo dados pessoais, entre em contato com a Track Energia através 
                dos canais disponibilizados no Site, especialmente a página de contato, indicando 
                no assunto “Proteção de Dados – LGPD”.
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
