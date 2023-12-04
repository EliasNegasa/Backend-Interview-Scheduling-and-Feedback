import asyncHandler from 'express-async-handler';
import generateUrl from '../utils/generate-url';
import Client from '../models/client';

const getClientById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const client = await Client.findById(id);

  if (!client) {
    res.status(404);
    throw new Error('Client not Found');
  }

  res.status(200).json(client);
});

const getClients = asyncHandler(async (req, res) => {
  const { page = 1, limit = 100, sort, ...filterQueries } = req.query;

  const total = await Client.countDocuments(filterQueries);

  if (page > Math.ceil(total / limit) && total > 0) {
    res.status(404);
    throw new Error('Page not Found');
  }

  const clients = await Client.find(filterQueries)
    .collation({ locale: 'en', strength: 2 })
    .sort(sort || '-createdAt')
    .skip((page - 1) * limit)
    .limit(+limit);

  res.status(200).json({
    metadata: {
      total,
      page: +page,
      limit: +limit,
    },
    links: {
      prev: page > 1 ? generateUrl(page - 1, limit, sort, 'clients') : null,
      self: req.originalUrl,
      next:
        page * limit < total
          ? generateUrl(+page + 1, limit, sort, 'clients')
          : null,
    },
    data: clients,
  });
});

const createClient = asyncHandler(async (req, res) => {
  const createdBy = req.user._id;
  const clientData = { ...req.body, createdBy };
  const client = await Client.create(clientData);

  res.status(201).json(client);
});

const updateClient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const client = await Client.findById(id);

  if (!client) {
    res.status(404);
    throw new Error('Client not Found');
  }
  const updatedBy = req.user._id;
  const clientData = { ...req.body, updatedBy };
  const updatedClient = await Client.findByIdAndUpdate(id, clientData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedClient);
});

const deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const client = await Client.findByIdAndDelete(id);

  if (!client) {
    res.status(404);
    throw new Error('Client not Found');
  }

  res.status(200).json({ message: 'Client Deleted' });
});

export { getClientById, getClients, createClient, updateClient, deleteClient };
