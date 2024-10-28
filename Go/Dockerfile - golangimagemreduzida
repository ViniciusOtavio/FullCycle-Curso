FROM golang:1.23-alpine As Build
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /full-cycle-rocks
FROM scratch
COPY --from=build /full-cycle-rocks /full-cycle-rocks
ENTRYPOINT ["/full-cycle-rocks"]
