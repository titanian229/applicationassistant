module.exports = (router) => {
    router.get('/api/ping', async (req, res) => {
        res.status(200).send({ success: true });
    });
};
