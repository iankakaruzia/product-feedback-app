import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, username, picture, secret } = req.body
  // 1
  if (req.method !== 'POST') {
    return res.status(403).json({ message: 'Method not allowed' })
  }

  // 2
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` })
  }

  // 3
  if (email) {
    let finalUsername

    if (username) {
      const usernameAlreadyExists = await prisma.user.findUnique({
        where: { username }
      })

      if (usernameAlreadyExists) {
        finalUsername = generateUsername(email)
      } else {
        finalUsername = username
      }
    } else {
      finalUsername = generateUsername(email)
    }
    // 4
    await prisma.user.create({
      data: {
        email,
        name,
        picture,
        username: finalUsername
      }
    })
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`
    })
  }
}

function generateUsername(email: string) {
  const milliseconds = new Date().getMilliseconds()
  const username = email.split('@')[0] + milliseconds
  return username
}

export default handler
