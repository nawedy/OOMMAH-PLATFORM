import { GetStaticProps } from 'next'
import { createSwaggerSpec } from 'next-swagger-doc'
import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic<{
  spec: any
}>(import('swagger-ui-react'), { ssr: false })

function ApiDoc({ spec }: { spec: any }) {
  return (
    <div className="api-doc">
      <SwaggerUI spec={spec} />
      <style jsx global>{`
        .api-doc .swagger-ui .topbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Oommah Platform API Documentation',
        version: '1.0',
      },
    },
  })

  return {
    props: {
      spec,
    },
  }
}

export default ApiDoc

