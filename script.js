const termBody = document.getElementById('terminal-body');
const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output'); 

const commands = [
    {
        name: 'help',
        description: 'List all available commands',
        usage: 'help [command]',
    },
    {
        name: 'clear',
        description: 'Clear the terminal screen',
        usage: 'clear',
    },
    {
        name: 'ls',
        description: 'List all files in the current directory',
        usage: 'ls',
    },
    {
        name: 'cat',
        description: 'Read the content of a file',
        usage: 'cat [file]',
    },
];


const files = [ 
    { 
        name: "about.txt",
        content: "This is the content of file1.txt",
    },
    {
        name: "contact.txt",
        content: "This is the content of file2.txt",
    },
    {
        name: "projects.txt",
        content: "This is the content of file3.txt",
    },
];

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const value = input.value;

        output.innerHTML += `<p>user@terminal:~$ ${value}</p>`;
        output.classList.add('terminal-input-text');
        executeCommand(value);

        input.value = '';

    }
});

function executeCommand(command){ 
    const args = command.split(' ');
    let response = document.createElement('p');

    switch (args[0]) {
        case 'help': 
            if (args.length === 1) {
                response.innerHTML = `Available commands<br><br>${commands.map(cmd => `${cmd.name} - ${cmd.description}`).join('<br>')}<br><br>For more information about a specific command, type 'help [command]'`;
                output.appendChild(response);
                termBody.scrollTop = termBody.scrollHeight;
                break;
            } 
            const commandName = args[1];
            const commandInfo = commands.find(cmd => cmd.name === commandName);
            if (!commandInfo) {
                response.innerHTML = 'Command not found';
                output.appendChild(response);
                termBody.scrollTop = termBody.scrollHeight;
                break;
            } 
            response.innerHTML = `Name: ${commandInfo.name}<br>Description: ${commandInfo.description}<br>Usage: ${commandInfo.usage}`;
            output.appendChild(response);
            termBody.scrollTop = termBody.scrollHeight;
            break;
        case 'clear':
            output.innerHTML = '';
            termBody.scrollTop = termBody.scrollHeight;
            break;
        case 'ls': 
            response.innerHTML = files.map(file => file.name).join('<br>');
            output.appendChild(response);
            termBody.scrollTop = termBody.scrollHeight;
            break;
        case 'cat':
            if (args.length !== 2) {
                response.innerHTML = 'Invalid number of arguments';
                output.appendChild(response);
                termBody.scrollTop = termBody.scrollHeight;
                break;
            }
            const file = args[1];
            const fileInfo = files.find(f => f.name === file); 
            if (!fileInfo) {
                response.innerHTML = 'File not found';
                output.appendChild(response);
                termBody.scrollTop = termBody.scrollHeight;
                break;
            } 
            response.innerHTML =  fileInfo.content;
            output.appendChild(response);
            termBody.scrollTop = termBody.scrollHeight;
            break;
        default:
            response.innerHTML = `Command not found: ${args[0]}`;
            output.appendChild(response);
            termBody.scrollTop = termBody.scrollHeight;
            break;
    }
} 
