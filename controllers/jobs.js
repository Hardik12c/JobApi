const jobschema = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const getalljobs = async (req, res) => {
    const jobs = await jobschema.find({ createdby: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getjob = async (req, res) => {
    const userId = req.user.userId;
    const id = req.params.id;
    const job = await jobschema.findOne({ _id: id, createdby: userId });
    if (!job) {
        throw new NotFoundError(`NO job with id ${id}`);
    }
    res.send(job);
}
const createjob = async (req, res) => {
    req.body.createdby = req.user.userId;
    const job = await jobschema.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

const updatejob = async (req, res) => {
    const userId = req.user.userId;
    const id = req.params.id;
    const { company, position } = req.body;
    if (company === '' || position === '') {
        throw new BadRequestError('Company or position fields cannot be empty');
    }
    const job = await jobschema.findOneAndUpdate({ _id: id, createdby: userId }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new NotFoundError(`NO job with id ${id}`);
    }
    res.status(StatusCodes.OK).json(job);
}

const deletejob = async (req, res) => {
    const userId = req.user.userId;
    const id = req.params.id;
    const job=await jobschema.findOneAndDelete({ _id: id, createdby: userId })
    if (!job) {
        throw new NotFoundError(`NO job with id ${id}`);
    }
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getalljobs,
    getjob,
    createjob,
    updatejob,
    deletejob,
}