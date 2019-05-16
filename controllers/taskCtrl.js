module.exports = (app) => {

    app.get('/api/task/:id', function (req, res) {
        const taskId = req.params.id;

        const dbConnection = app.persistence.repositoryFactory();
        const taskRepository = new app.persistence.taskRepository(dbConnection);

        taskRepository.getById(taskId, function (result, exc) {
            if (exc) {
                console.log('Erro ao buscar as tasks. Ex: ' + exc);
                res.status(500).send(exc)
            } else {
                console.log('Tasks encontrados com sucesso!');
                res.status(200).send(result);
            }
        });
    });

    app.get('/api/task', function (req, res) {
        let dbConnection = app.persistence.repositoryFactory();
        let taskRepository = new app.persistence.taskRepository(dbConnection);

        taskRepository.getAll(function (result, exc) {
            if (exc) {
                console.log('Erro ao buscar as tasks. Ex: ' + exc);
                res.status(500).send(exc)
            } else {
                console.log('Tasks encontrados com sucesso!');
                res.status(200).send(result);
            }
        });
    });

    app.post('/api/task', function (req, res) {
        req.assert("description", "Descrição é obrigatória!")
            .notEmpty();

        const valdiationInputs = req.validationErrors();

        if (valdiationInputs) {
            console.log(valdiationInputs);
            res.status(500).send(valdiationInputs);
            return;
        }

        const newTask = req.body;

        const dbConnection = app.persistence.repositoryFactory();
        const taskRepository = new app.persistence.taskRepository(dbConnection);

        taskRepository.add(newTask, function (result, exc) {
            if (exc) {
                console.log('Erro ao gravar a task. Ex: ' + exc);
                res.status(500).send(exc)
            } else {
                console.log('Task cadastrada com sucesso!');
                res.status(200).send(result);
            }
        });
    });

    app.put('/api/task/:id', function (req, res) {

        req.assert("description", "Descrição é obrigatória!")
            .notEmpty();

        const valdiationInputs = req.validationErrors();

        if (valdiationInputs) {
            console.log(valdiationInputs);
            res.status(500).send(valdiationInputs);
            return;
        }

        let updateTask = {};
        updateTask.id = req.params.id;
        updateTask.description = req.body.description;

        const dbConnection = app.persistence.repositoryFactory();
        const taskRepository = new app.persistence.taskRepository(dbConnection);

        taskRepository.update(updateTask, function (result, exc) {
            if (exc) {
                console.log('Erro ao atualizar a task. Ex: ' + exc);
                res.status(500).send(exc)
            } else {
                console.log('Task atualizada com sucesso!');
                res.status(200).send(result);
            }
        });
    });

    app.delete('/api/task/:id', function (req, res) {
        const taskId = req.params.id;

        const dbConnection = app.persistence.repositoryFactory();
        const taskRepository = new app.persistence.taskRepository(dbConnection);

        taskRepository.delete(taskId, function (result, exc) {
            if (exc) {
                console.log('Erro ao excluir a task. Ex: ' + exc);
                res.status(500).send(exc)
            } else {
                console.log('Task excluída com sucesso!');
                res.status(200).send({ success: 'Task excluída com sucesso!' });
            }
        });
    });
}