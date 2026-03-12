import React, { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
              Termos de Uso
            </h1>
            <p className="mt-4 text-sm text-zinc-500">
              Última atualização: março de 2025
            </p>
          </header>

          <div className="prose prose-lg prose-zinc max-w-none text-zinc-600 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-zinc-900">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar o site da Track Energia, localizado em [domínio do site] (“Site”), 
                você declara ter lido, compreendido e concordado integralmente com os presentes Termos 
                de Uso (“Termos”). Caso não concorde com quaisquer disposições aqui estabelecidas, 
                solicitamos que se abstenha de utilizar o Site. O uso continuado do Site constitui 
                aceitação tácita dos Termos em vigor no momento do acesso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">2. Objeto e Escopo</h2>
              <p>
                Os presentes Termos regem o acesso e a utilização do Site da Track Energia, empresa 
                especializada em soluções de eficiência energética, geração, armazenamento e gestão 
                de energia. O Site tem caráter informativo e comercial, destinado à divulgação de 
                produtos e serviços, bem como ao estabelecimento de canal de comunicação com 
                potenciais clientes e parceiros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">3. Capacidade e Legitimidade</h2>
              <p>
                O uso do Site é permitido exclusivamente a pessoas físicas capazes ou pessoas jurídicas 
                regularmente constituídas, em conformidade com a legislação brasileira. Menores de 18 
                (dezoito) anos devem obter autorização expressa de pais ou responsáveis legais antes 
                de utilizar o Site. O usuário declara ser o único responsável por todas as ações 
                realizadas em seu nome através do Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">4. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo disponibilizado no Site, incluindo, mas não se limitando a, textos, 
                imagens, logotipos, ícones, fotografias, vídeos, áudios, layout, design gráfico e 
                demais elementos, é de propriedade exclusiva da Track Energia ou de seus licenciadores, 
                estando protegido pelas leis de propriedade intelectual e direitos autorais vigentes 
                no Brasil. É expressamente vedada a reprodução, distribuição, modificação, 
                comercialização ou utilização de qualquer conteúdo do Site sem autorização prévia e 
                por escrito da Track Energia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">5. Uso Permitido e Conduta do Usuário</h2>
              <p>
                O usuário compromete-se a utilizar o Site de boa-fé, em conformidade com a lei e com 
                os presentes Termos. É vedado ao usuário: (a) utilizar o Site para fins ilícitos ou 
                contrários à ordem pública; (b) transmitir vírus, malwares ou qualquer código malicioso; 
                (c) tentar obter acesso não autorizado a sistemas, redes ou dados da Track Energia ou 
                de terceiros; (d) coletar dados de outros usuários sem consentimento; (e) praticar 
                engenharia reversa ou descompilação do Site; (f) utilizar robôs, crawlers ou 
                ferramentas automatizadas sem autorização; (g) prejudicar o funcionamento do Site ou 
                a experiência de outros usuários.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">6. Informações e Conteúdo</h2>
              <p>
                As informações disponibilizadas no Site têm caráter meramente informativo e podem ser 
                alteradas a qualquer momento, sem aviso prévio. A Track Energia empenha-se em manter 
                a precisão das informações, porém não garante que o conteúdo esteja completo, atual 
                ou isento de erros. Para informações oficiais, comerciais ou técnicas específicas, 
                recomenda-se o contato direto com a empresa através dos canais disponibilizados no Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">7. Links para Sites de Terceiros</h2>
              <p>
                O Site pode conter links para sites de terceiros. A inclusão de tais links não 
                implica endosso, aprovação ou responsabilidade da Track Energia em relação ao 
                conteúdo, produtos ou serviços disponibilizados em sites externos. O acesso a 
                sites de terceiros é realizado por conta e risco do usuário.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">8. Limitação de Responsabilidade</h2>
              <p>
                Na máxima extensão permitida pela lei, a Track Energia não se responsabiliza por 
                danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do 
                uso ou da impossibilidade de uso do Site, incluindo, mas não se limitando a, perda 
                de dados, lucros ou oportunidades de negócio. O Site é fornecido “como está” e a 
                Track Energia não garante disponibilidade ininterrupta ou isenção de erros. Em 
                nenhuma hipótese a responsabilidade da Track Energia excederá o valor correspondente 
                aos serviços efetivamente contratados pelo usuário.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">9. Modificações</h2>
              <p>
                A Track Energia reserva-se o direito de modificar, suspender ou descontinuar, 
                temporária ou permanentemente, o Site ou qualquer parte dele, com ou sem aviso 
                prévio. Os Termos de Uso podem ser alterados a qualquer momento, sendo a versão 
                vigente aquela publicada no Site. A data da última atualização será sempre indicada 
                no topo deste documento. O uso continuado do Site após alterações constitui aceitação 
                dos novos Termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">10. Lei Aplicável e Foro</h2>
              <p>
                Os presentes Termos são regidos pelas leis da República Federativa do Brasil. Para 
                dirimir quaisquer controvérsias oriundas destes Termos ou do uso do Site, fica 
                eleito o foro da comarca de Uberlândia, Estado de Minas Gerais, com renúncia expressa 
                a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">11. Disposições Gerais</h2>
              <p>
                A nulidade ou invalidade de qualquer disposição destes Termos não afetará a validade 
                das demais cláusulas. A inércia ou tolerância da Track Energia quanto ao descumprimento 
                de qualquer obrigação não constituirá renúncia ao direito de exigir seu cumprimento. 
                Os títulos das seções têm caráter meramente informativo e não influenciam a 
                interpretação das disposições.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900">12. Contato</h2>
              <p>
                Para dúvidas, esclarecimentos ou comunicações relativas aos presentes Termos de Uso, 
                o usuário pode entrar em contato com a Track Energia através dos canais disponibilizados 
                no Site, especialmente a página de contato e os endereços de e-mail e telefone ali 
                indicados.
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
