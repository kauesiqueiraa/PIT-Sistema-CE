import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="w-full mt-8 py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-sm text-muted-foreground">
            Projeto Integrador Transdisciplinar em Sistemas de Informação II
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Projeto de faculdade desenvolvido por: <span className= 'dark:text-white text-black'>Emerson Oliveira</span>
          </p>
          <p className="text-center text-sm text-muted-foreground">
            
            8º Periodo - 2024
          </p>
          
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="https://github.com/seu-usuario" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="https://linkedin.com/in/seu-perfil" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="mailto:seu-email@exemplo.com"
                className="hover:text-blue-600"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
          
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;