# Build stage
FROM eclipse-temurin:22-jdk AS builder

WORKDIR /build

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests


# Runtime stage
FROM eclipse-temurin:22-jre

WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]