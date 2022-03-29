using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    phoneNumber = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    dateConnect = table.Column<DateTime>(type: "date", nullable: false),
                    balance = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    isPhysCl = table.Column<bool>(type: "bit", nullable: false),
                    password = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: false),
                    freeMin = table.Column<int>(type: "int", nullable: false),
                    freeSms = table.Column<int>(type: "int", nullable: false),
                    freeGB = table.Column<float>(type: "real", nullable: false),
                    name = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    surName = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    dateOfBirth = table.Column<DateTime>(type: "date", nullable: true),
                    numberPassport = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    nameOrganization = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    legalAdress = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ITN = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    startDate = table.Column<DateTime>(type: "date", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExtraService",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    subscFee = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    description = table.Column<string>(type: "ntext", nullable: false),
                    CanConnectThisSer = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtraService", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TariffPlan",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    costOneMinCallCity = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    costOneMinCallOutCity = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    CostOneMinCallInternation = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    intGB = table.Column<float>(type: "real", nullable: false),
                    SMS = table.Column<int>(type: "int", nullable: false),
                    isPhysTar = table.Column<bool>(type: "bit", nullable: false),
                    costChangeTar = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    CanConnectThisTar = table.Column<bool>(type: "bit", nullable: false),
                    subcriptionFee = table.Column<int>(type: "int", nullable: false),
                    freeMinuteForMonth = table.Column<int>(type: "int", nullable: false),
                    costSms = table.Column<decimal>(type: "decimal(18,0)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TariffPlan", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AddBalance",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idClient = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SumForAdd = table.Column<int>(type: "int", nullable: false),
                    phoneNumberForAddBalance = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    numberBankCard = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    nameBankCard = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    dateBankCard = table.Column<DateTime>(type: "date", nullable: false),
                    CVVBankCard = table.Column<int>(type: "int", nullable: false),
                    dateAddBalance = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddBalance", x => x.id);
                    table.ForeignKey(
                        name: "FK_AddBalance_Client",
                        column: x => x.idClient,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Call",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dateCall = table.Column<DateTime>(type: "date", nullable: false),
                    timeTalk = table.Column<int>(type: "int", nullable: false),
                    numberWasCall = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    callType = table.Column<int>(type: "int", nullable: false),
                    costCall = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    incomingCall = table.Column<bool>(type: "bit", nullable: false),
                    idClient = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Call", x => x.id);
                    table.ForeignKey(
                        name: "FK_Call_Client",
                        column: x => x.idClient,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sms",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idClient = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    dateSms = table.Column<DateTime>(type: "date", nullable: false),
                    recipientSms = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    textSms = table.Column<string>(type: "text", nullable: false),
                    costSMS = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    incomingSms = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sms", x => x.id);
                    table.ForeignKey(
                        name: "FK_Sms_Client",
                        column: x => x.idClient,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConnectService",
                columns: table => new
                {
                    idConnectServ = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idClient = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    idExtraService = table.Column<int>(type: "int", nullable: false),
                    dateConnectBegin = table.Column<DateTime>(type: "date", nullable: false),
                    dateConnectEnd = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConnectService", x => x.idConnectServ);
                    table.ForeignKey(
                        name: "FK_ConnectService_Client",
                        column: x => x.idClient,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConnectService_ExtraService",
                        column: x => x.idExtraService,
                        principalTable: "ExtraService",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConnectTariff",
                columns: table => new
                {
                    idConnectTariff = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idClient = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    idTariffPlan = table.Column<int>(type: "int", nullable: false),
                    dateConnectTariffBegin = table.Column<DateTime>(type: "date", nullable: false),
                    dateConnectTariffEnd = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConnectTariff", x => x.idConnectTariff);
                    table.ForeignKey(
                        name: "FK_ConnectTariff_Client",
                        column: x => x.idClient,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ConnectTariff_TariffPlan",
                        column: x => x.idTariffPlan,
                        principalTable: "TariffPlan",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AddBalance_idClient",
                table: "AddBalance",
                column: "idClient");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Call_idClient",
                table: "Call",
                column: "idClient");

            migrationBuilder.CreateIndex(
                name: "IX_ConnectService_idClient",
                table: "ConnectService",
                column: "idClient");

            migrationBuilder.CreateIndex(
                name: "IX_ConnectService_idExtraService",
                table: "ConnectService",
                column: "idExtraService");

            migrationBuilder.CreateIndex(
                name: "IX_ConnectTariff_idClient",
                table: "ConnectTariff",
                column: "idClient");

            migrationBuilder.CreateIndex(
                name: "IX_ConnectTariff_idTariffPlan",
                table: "ConnectTariff",
                column: "idTariffPlan");

            migrationBuilder.CreateIndex(
                name: "IX_Sms_idClient",
                table: "Sms",
                column: "idClient");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddBalance");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Call");

            migrationBuilder.DropTable(
                name: "ConnectService");

            migrationBuilder.DropTable(
                name: "ConnectTariff");

            migrationBuilder.DropTable(
                name: "Sms");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "ExtraService");

            migrationBuilder.DropTable(
                name: "TariffPlan");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
