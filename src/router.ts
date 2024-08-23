import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middlewate";

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *              - Users
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags: 
 *              - Products
 *          description: Return a product based on its unitque ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application(json):
 *                          schema:
 *                             $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid ID    
 */

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 27 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 299
 *          responses:
 *              201:
 *                  description: Product created successfully
 *              400:
 *                  description: Bad Request - Invalid input data
 */

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products 
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 27 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 299
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              201:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or invalid input data
 *              404:
 *                  description: product Not Fount
 */

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products 
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: product Not Fount
 */


/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products 
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: product Not Fount
 */

// Routing
router.get('/', getProducts)

router.get('/:id', 
    param('id').isInt().withMessage('ID no válido...'),
    handleInputErrors,
    getProductsById
)

router.post('/', 
    // Validación
    body('name')
            .notEmpty().withMessage('El nombre del producto no puede ir vacio.'),
    body('price')
            .isNumeric().withMessage('Valor no válido')
            .notEmpty().withMessage('El precio del producto no puede ir vacio.')
            .custom( value => value > 0 ).withMessage('Precio no válido... '),
    handleInputErrors,
    createProduct)

router.put('/:id', 
    // 
    param('id').isInt().withMessage('ID no válido...'),
    body('name')
            .notEmpty().withMessage('El nombre del producto no puede ir vacio.'),
    body('price')
            .isNumeric().withMessage('Valor no válido')
            .notEmpty().withMessage('El precio del producto no puede ir vacio.')
            .custom( value => value > 0 ).withMessage('Precio no válido... '),
    body('availability')
            .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct)

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido...'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id',
    handleInputErrors,
    deleteProduct
)

export default router