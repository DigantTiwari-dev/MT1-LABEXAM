
import http from 'http';

// Employee tasks array
const tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending"
    },
    {
        id: 2,
        taskName: "Create Dashboard",
        assignedTo: "Amit Kumar",
        status: "Completed"
    },
    {
        id: 3,
        taskName: "Test Application",
        assignedTo: "Priya Singh",
        status: "In Progress"
    }
];

// Create HTTP server
const server = http.createServer((req, res) => {

    // A2: GET /
    if (req.url === '/' && req.method === 'GET') {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>Welcome to Employee Task Management System</h1>
            <p>Manage your employee tasks easily.</p>
        `);
    }

    // A2 + A3: GET /tasks
    else if (req.url === '/tasks' && req.method === 'GET') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(tasks));
    }

    // A2: GET /about
    else if (req.url === '/about' && req.method === 'GET') {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>About Employee Task Management</h1>
            <p>This application helps manage employee tasks.</p>
        `);
    }

    // A3: POST /add-task
    else if (req.url === '/add-task' && req.method === 'POST') {

        let body = '';

        // Receive data from client
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        // When complete data is received
        req.on('end', () => {

            try {

                // Convert JSON string into object
                const newTask = JSON.parse(body);

                // Validate required fields
                if (
                    newTask.id === undefined ||
                    !newTask.taskName ||
                    !newTask.assignedTo ||
                    !newTask.status
                ) {

                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    });

                    return res.end(JSON.stringify({
                        message: "All fields are required"
                    }));
                }

                // Add new task to array
                tasks.push(newTask);

                // Send success response
                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: "Task added successfully",
                    task: newTask
                }));

            } catch (error) {

                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }

        });
    }

    // Invalid route
    else {

        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: "Route not found"
        }));
    }

});

// Start server
server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
