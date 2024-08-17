import {Skeleton} from 'antd'

const LoadingCard = () => {
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-fixed position-relative'>
              <Skeleton.Image active className='w-200px mh-100' />
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <div className='text-gray-900 text-hover-primary fs-2 fw-bold me-1'>
                    <Skeleton.Input active />
                  </div>
                  <div>
                    <Skeleton.Avatar active />
                  </div>
                </div>

                <div className='d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2'>
                  <div className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                    <Skeleton.Input active size='small' />
                  </div>
                  <div className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                    <Skeleton.Input active size='small' />
                  </div>
                  <div className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                    <Skeleton.Input active size='small' />
                  </div>
                </div>
              </div>

              <div className='d-flex my-4'>
                <div className='me-2'>
                  <Skeleton.Button active />
                </div>
                <div className='me-2'>
                  <Skeleton.Button active />
                </div>

                <div className='me-0'>
                  <Skeleton.Avatar active />
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <Skeleton.Avatar active size='small' />
                      <div className='ms-2 fw-bold'>
                        <Skeleton.Button active size='small' block={false} />
                      </div>
                    </div>

                    <div className='mt-3'>
                      <Skeleton.Input active size='small' />
                    </div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <Skeleton.Avatar active size='small' />
                      <div className='ms-2 fw-bold'>
                        <Skeleton.Button active size='small' block={false} />
                      </div>
                    </div>

                    <div className='mt-3'>
                      <Skeleton.Input active size='small' />
                    </div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <Skeleton.Avatar active size='small' />
                      <div className='ms-2 fw-bold'>
                        <Skeleton.Button active size='small' block={false} />
                      </div>
                    </div>

                    <div className='mt-3'>
                      <Skeleton.Input active size='small' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <Skeleton.Input active size='small' />
                  <Skeleton.Input active size='small' />
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <Skeleton.Input size='small' active className='w-100' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
          <Skeleton.Input size='large' active className='w-100' />
        </ul>
      </div>
    </div>
  )
}

export default LoadingCard
