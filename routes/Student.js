import Student from '../models/Student.js'
import express from 'express'
import sanitizeBody from '../middleware/sanitizeBody.js'




router.get('/', async (req, res) => {
  const collection = await Student.find().populate('owner')
  res.send({ data: formatResponseData(collection) })
})

router.post('/', sanitizeBody, async (req, res) => {
  let newStudent = new Student(req.sanitizedBody)
  try {
    await newStudent.save()
    res.status(201).json({ data: formatResponseData(newStudent) })
  } catch (err) {
    debug(err)
    res.status(500).send({
      errors: [
        {
          status: '500',
          title: 'Server error',
          description: 'Problem saving document to the database.',
        },
      ],
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const Student = await Student.findById(req.params.id).populate('owner')
    if (!Student) throw new Error('Resource not found')
    res.json({ data: formatResponseData(Student) })
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

const update =
  (overwrite = false) =>
  async (req, res) => {
    try {
      const Student = await Student.findByIdAndUpdate(
        req.params.id,
        req.sanitizedBody,
        {
          new: true,
          overwrite,
          runValidators: true,
        }
      )
      if (!Student) throw new Error('Resource not found')
      res.json({ data: formatResponseData(Student) })
    } catch (err) {
      sendResourceNotFound(req, res)
    }
  }
router.put('/:id', sanitizeBody, update(true))

router.patch('/:id', sanitizeBody, update(false))

router.delete('/:id', async (req, res) => {
  try {
    const Student = await Student.findByIdAndRemove(req.params.id)
    if (!Student) throw new Error('Resource not found')
    res.json({ data: formatResponseData(Student) })
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})

/**
 * Format the response data object according to JSON:API v1.0
 * @param {string} type The resource collection name, e.g. 'Students'
 * @param {Object | Object[]} payload An array or instance object from that collection
 * @returns
 */


function formatResponseData(payload, type = 'Students') {
  if (payload instanceof Array) {
    return payload.map((resource) => format(resource))
  } else {
    return format(payload)
  }



function format(resource) {
    const { _id, ...attributes } = resource.toObject()
    return { type, id: _id, attributes }
  }
}


function sendResourceNotFound(req, res) {
  res.status(404).send({
    error: [
      {
        status: '404',
        title: 'Resource does nto exist',
        description: `We could not find a Student with id: ${req.params.id}`,
      },
    ],
  })
}

export default router
