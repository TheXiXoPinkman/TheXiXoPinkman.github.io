document.addEventListener('DOMContentLoaded', function() {
  const terminalOutput = document.getElementById('terminal-output');
  const commandInput = document.getElementById('command-input');
  
  // Datos del CV en formato de "archivos"
  const cvFiles = {
    'about_me.txt': `>> Tu_Nombre - Analista Programador [COBOL/Python]
>> Ubicación: Ciudad, Provincia

Soy un profesional del desarrollo de software con interés en la automatización, 
la eficiencia y la mejora continua. 

Especializado en COBOL para sistemas legacy y Python para automatización 
y análisis de datos.`,

    'skills.txt': `>> Habilidades Técnicas:
- Python (Avanzado) ████████░░ 80%
- COBOL (Experto) ██████████ 100%
- SQL (Intermedio) ██████░░░░ 60%
- Git (Intermedio) ███████░░░ 70%
- HTML/CSS (Básico) ███░░░░░░░ 30%`,

    'education.txt': `>> Formación Académica:
- Grado en Informática – Nombre del centro (Años)
- Certificación en Python Avanzado
- Curso de Modernización de Sistemas COBOL`,

    'contact.txt': `>> Información de Contacto:
- Correo electrónico: tu.email@ejemplo.com
- LinkedIn: linkedin.com/in/tunombre
- GitHub: github.com/tunombre`,
    
    'photo.txt': `>> Foto de perfil profesional`,
  
    
  // También añadimos un objeto para las imágenes
  };

  
const cvImages = {
  'profile': {
    description: 'Foto de perfil profesional',
    url: 'profile.jpg', // o la ruta a tu imagen
    ascii: `
        .-~~~~~~~~~-._       _.-~~~~~~~~~-.
    __.'              ~.   .~              \`.__
  .'//                  \./                  \\\`.
.'//                     |                     \\\`.
.'// .-~"""""""~~~~-._     |     _,-~~~~"""""""~-. \\\`.
.'//.-"               \`-.  |  .-'               "-.\\\`.
.'//______.============-..   ..-============.______\\\`.
.'______________________________\______________________________.
    `
  },
  'diagram': {
    description: 'Diagrama de arquitectura de sistemas',
    url: 'diagram.png',
    ascii: `
    +---------------+
    |   Frontend    |
    +-------┬-------+
            |
    +-------▼-------+
    |    Backend    |
    +-------┬-------+
            |
    +-------▼-------+
    |  Base de Datos|
    +---------------+
    `
  }
};

  
  // Comandos disponibles
  const commands = {
    'help': {
      description: 'Muestra esta ayuda',
      execute: function() {
        let output = '<div class="command-line"><span class="prompt">></span> <span class="help-command">Comandos disponibles:</span></div>';
        for (const cmd in commands) {
          output += `<div class="command-line">
            <span class="prompt">></span> 
            <span class="help-command">${cmd}</span> 
            <span class="help-description">- ${commands[cmd].description}</span>
          </div>`;
        }
        output += `<div class="command-line">
          <span class="prompt">></span> 
          <span class="help-command">cat [archivo]</span> 
          <span class="help-description">- Muestra el contenido de un archivo (about_me.txt, skills.txt, education.txt, contact.txt)</span>
        </div>`;
        output += `<div class="command-line">
          <span class="prompt">></span> 
        </div>`;
        return output;
      }
    },
    'clear': {
      description: 'Limpia la terminal',
      execute: function() {
        terminalOutput.innerHTML = '';
        return '';
      }
    },
    
    'show_image': {
    description: 'Muestra una imagen en formato ASCII o real',
    execute: function(args) {
      if (args.length < 1) {
        return `<div class="command-line error-message">Uso: show_image [nombre_imagen] --mode=[ascii|real]</div>
                <div class="command-line"><span class="prompt">></span> <span class="help-command">Imágenes disponibles:</span></div>
                ${Object.keys(cvImages).map(img => 
                  `<div class="command-line">
                    <span class="prompt">></span> 
                    <span class="help-command">${img}</span> 
                    <span class="help-description">- ${cvImages[img].description}</span>
                  </div>`
                ).join('')}`;
      }
      
      const imageName = args[0];
      const mode = args.includes('--mode=real') ? 'real' : 'ascii';
      
      if (!cvImages[imageName]) {
        return `<div class="command-line error-message">show_image: ${imageName}: Imagen no encontrada</div>`;
      }
      
      if (mode === 'ascii') {
        return `<div class="command-line">
                  <span class="prompt">></span> 
                  <span class="help-command">Mostrando ${imageName} en formato ASCII:</span>
                </div>
                <div class="ascii-art">${cvImages[imageName].ascii}</div>
                <div class="command-line">
                  <span class="prompt">></span> 
                  <span class="help-description">${cvImages[imageName].description}</span>
                </div>`;
      } else {
        return `<div class="command-line">
                  <span class="prompt">></span> 
                  <span class="help-command">Mostrando ${imageName}:</span>
                </div>
                <div class="image-container">
                  <img src="${cvImages[imageName].url}" alt="${cvImages[imageName].description}" class="terminal-image">
                </div>
                <div class="command-line">
                  <span class="prompt">></span> 
                  <span class="help-description">${cvImages[imageName].description}</span>
                </div>`;
      }
    }
  },
    
    
  'show_all': {
    description: 'Muestra toda la información del CV de una vez',
    execute: function() {
      let output = '';
      
      // Mostrar about_me
      output += `<div class="command-line">
        <span class="prompt">tu_nombre@cv-terminal:~$</span> 
        <span class="command">cat about_me.txt</span>
      </div>
      <div class="command-line">
        <span class="prompt">></span> 
        <span class="file-content">${cvFiles['about_me.txt']}</span>
      </div>`;
      
      // Mostrar skills
      output += `<div class="command-line">
        <span class="prompt">tu_nombre@cv-terminal:~$</span> 
        <span class="command">cat skills.txt</span>
      </div>
      <div class="command-line">
        <span class="prompt">></span> 
        <span class="file-content">${cvFiles['skills.txt']}</span>
      </div>`;
      
      // Mostrar education
      output += `<div class="command-line">
        <span class="prompt">tu_nombre@cv-terminal:~$</span> 
        <span class="command">cat education.txt</span>
      </div>
      <div class="command-line">
        <span class="prompt">></span> 
        <span class="file-content">${cvFiles['education.txt']}</span>
      </div>`;
      
      // Mostrar contact
      output += `<div class="command-line">
        <span class="prompt">tu_nombre@cv-terminal:~$</span> 
        <span class="command">cat contact.txt</span>
      </div>
      <div class="command-line">
        <span class="prompt">></span> 
        <span class="file-content">${cvFiles['contact.txt']}</span>
      </div>`;
      
      return output;
    }
  },
    
    'download': {
    description: 'Descarga el CV en formato PDF o TXT',
    execute: function(args) {
      if (args.length < 1) {
        return `<div class="command-line error-message">Uso: download [formato]</div>
                <div class="command-line"><span class="prompt">></span> <span class="help-command">Formatos disponibles:</span></div>
                <div class="command-line">
                  <span class="prompt">></span> 
                  <span class="help-command">pdf</span> 
                  <span class="help-description">- Versión formal en PDF</span>
                </div>
                <div class="command-line">
                  <span class="prompt">></span> 
                  <span class="help-command">txt</span> 
                  <span class="help-description">- Versión en texto plano</span>
                </div>`;
      }
      
      const format = args[0].toLowerCase();
      
      // Crear enlace de descarga dinámico
      const downloadLink = document.createElement('a');
      downloadLink.style.display = 'none';
      
      if (format === 'pdf') {
        downloadLink.href = 'cv_tunombre.pdf'; // Reemplaza con la ruta real a tu PDF
        downloadLink.download = 'CV_TuNombre.pdf';
      } else if (format === 'txt') {
        // Crear contenido TXT dinámico
        const txtContent = `
          CV de Tu Nombre
          ================
          
          ${cvFiles['about_me.txt'].replace(/>>/g, '').replace(/<[^>]*>/g, '')}
          
          ${cvFiles['skills.txt'].replace(/>>/g, '').replace(/<[^>]*>/g, '')}
          
          ${cvFiles['education.txt'].replace(/>>/g, '').replace(/<[^>]*>/g, '')}
          
          ${cvFiles['contact.txt'].replace(/>>/g, '').replace(/<[^>]*>/g, '')}
        `;
        
        const blob = new Blob([txtContent], { type: 'text/plain' });
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'CV_TuNombre.txt';
      } else {
        return `<div class="command-line error-message">Formato no válido. Use 'pdf' o 'txt'</div>`;
      }
      
      // Simular click en el enlace de descarga
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      return `<div class="command-line">
                <span class="prompt">></span> 
                <span class="text-highlight">Descarga iniciada: CV_TuNombre.${format}</span>
              </div>`;
    }
  },
    
    'cat': {
      description: 'Muestra contenido de archivos',
      execute: function(args) {
        if (args.length < 1) {
          return `<div class="command-line error-message">Uso: cat [archivo]</div>`;
        }
        
        const filename = args[0];
        if (cvFiles[filename]) {
          return `<div class="command-line">
            <span class="prompt">></span> 
            <span class="file-content">${cvFiles[filename]}</span>
          </div>`;
        } else {
          return `<div class="command-line error-message">cat: ${filename}: No existe el archivo</div>`;
        }
      }
    }
  };

  // Función para procesar comandos
  function processCommand(command) {
    // Mostrar el comando que escribió el usuario
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';
    commandLine.innerHTML = `<span class="prompt">tu_nombre@cv-terminal:~$</span> <span class="command">${command}</span>`;
    terminalOutput.appendChild(commandLine);
    
    // Parsear el comando
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let output = '';
    
    if (commands[cmd]) {
      output = commands[cmd].execute(args);
    } else if (cmd === '') {
      // Comando vacío, no hacer nada
    } else {
      output = `<div class="command-line error-message">${cmd}: comando no encontrado. Escribe 'help' para ver los comandos disponibles.</div>`;
    }
    
    if (output) {
      const outputDiv = document.createElement('div');
      outputDiv.innerHTML = output;
      terminalOutput.appendChild(outputDiv);
    }
    
    // Hacer scroll al final
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Manejar el evento de entrada
  commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      processCommand(this.value);
      this.value = '';
      e.preventDefault();
    }
  });

  // Enfocar el input al cargar la página
  commandInput.focus();
});