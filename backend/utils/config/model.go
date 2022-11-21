package config

type Model struct {
	Environment environment `yaml:"environment" validate:"gte=1,lte=2"`
	LogLevel    uint32      `yaml:"log_level" validate:"required"`
	Address     string      `yaml:"address" validate:"required"`
}

type environment uint8

const (
	EnvironmentDev  environment = 1
	EnvironmentProd environment = 2
)
