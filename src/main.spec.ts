import * as fs from 'fs';
import * as path from 'path';

describe('Main Application Bootstrap', () => {
  it('should have main.ts file with bootstrap function', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileExists = fs.existsSync(mainFilePath);
    expect(mainFileExists).toBe(true);
  });

  it('should contain NestFactory import', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('import { NestFactory }');
  });

  it('should contain ValidationPipe import', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('import { ValidationPipe }');
  });

  it('should contain AppModule import', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('import { AppModule }');
  });

  it('should contain SwaggerModule import', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('import { DocumentBuilder, SwaggerModule }');
  });

  it('should contain ConfigService import', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('import { ConfigService }');
  });

  it('should contain bootstrap function definition', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('async function bootstrap()');
  });

  it('should configure global prefix', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain("app.setGlobalPrefix('api'");
  });

  it('should exclude health endpoints from global prefix', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain("exclude: ['health', 'health/db']");
  });

  it('should set up Swagger documentation', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('SwaggerModule.createDocument');
    expect(mainFileContent).toContain('SwaggerModule.setup');
  });

  it('should configure Swagger with correct title', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain("setTitle(\"Helldiver's Hangar API\")");
  });

  it('should configure Swagger with correct description', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain("setDescription(\"API documentation for Helldiver's Hangar\")");
  });

  it('should configure Swagger with version', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain("setVersion('1.1')");
  });

  it('should add Bearer authentication to Swagger', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('.addBearerAuth()');
  });

  it('should apply global validation pipe', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('app.useGlobalPipes');
    expect(mainFileContent).toContain('new ValidationPipe');
  });

  it('should configure validation pipe with whitelist', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('whitelist: true');
  });

  it('should configure validation pipe with forbidNonWhitelisted', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('forbidNonWhitelisted: true');
  });

  it('should configure validation pipe with transform', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('transform: true');
  });

  it('should enable CORS', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('app.enableCors');
  });

  it('should configure CORS with origin from config', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain("origin: configService.get<string>('CORS_ORIGIN')");
  });

  it('should configure CORS with correct methods', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain("methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'");
  });

  it('should configure CORS with credentials', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('credentials: true');
  });

  it('should get port from config with default fallback', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain("configService.get<number>('PORT') || 3500");
  });

  it('should start the application listening', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('await app.listen(port)');
  });

  it('should call bootstrap function', () => {
    const mainFilePath = path.join(__dirname, 'main.ts');
    const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
    expect(mainFileContent).toContain('void bootstrap()');
  });
});