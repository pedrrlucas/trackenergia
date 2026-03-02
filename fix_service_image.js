import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// O problema é que o objeto 'service' não tem as propriedades 'image' e 'tag' na estrutura do service-detail.tsx
// O objeto na página inicial chamava-se product, mas aqui é importado do services.tsx e a estrutura é diferente.
// Em client/src/pages/services.tsx as imagens são importadas e exportadas. 
// Vamos olhar como o serviço é definido e buscar a imagem correspondente.

const regex = /<img\s*src=\{service\.image\}\s*alt=\{service\.title\}\s*className="absolute inset-0 w-full h-full object-cover transition-transform duration-\[2s\] ease-\[0\.16,1,0\.3,1\] group-hover:scale-105"\s*\/>/;

// Se `service.image` for undefined, a imagem não carrega. No mockup de services, os serviços são carregados do banco de mock ou dados estáticos.
// Precisamos verificar o arquivo src/pages/services.tsx para ver onde essas imagens estão.

if (regex.test(content)) {
    console.log("Found the image tag using service.image.");
} else {
    console.log("Could not find the image tag.");
}
