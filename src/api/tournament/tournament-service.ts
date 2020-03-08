import { PrismaClient } from "@prisma/client"
import { inject, injectable } from "inversify"
import {
  TTournament,
  TTournamentList,
  TTournamentUpdateProps,
  TTournamentVideo,
  TTournamentVideoCreateProps,
} from "../../common/types/tournament-types"
import { PrismaService } from "../server/prisma-service"

@injectable()
export class TournamentService {
  prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  list = async (): Promise<TTournamentList[]> => {
    const tournaments = await this.prisma.tournament.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return tournaments
  }
  getTournament = async (id: string): Promise<TTournament> => {
    const tournament = await this.prisma.tournament.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        videos: { select: { id: true, url: true } },
        images: { select: { id: true, url: true } },
      },
    })
    if (!tournament) {
      throw new Error("Unknown tournament")
    }
    return tournament
  }
  create = async (data: TTournamentUpdateProps): Promise<string> => {
    const tournament = await this.prisma.tournament.create({ data })
    return tournament.id
  }
  update = async (id: string, data: TTournamentUpdateProps): Promise<TTournament> => {
    const tournament = await this.prisma.tournament.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        videos: { select: { id: true, url: true } },
        images: { select: { id: true, url: true } },
      },
    })
    return tournament
  }
  deleteTournament = async (id: string): Promise<TTournamentList[]> => {
    await this.prisma.tournamentImage.deleteMany({ where: { tournament: { id } } })
    await this.prisma.tournamentVideo.deleteMany({ where: { tournament: { id } } })
    await this.prisma.tournament.delete({ where: { id } })
    const tournaments = await this.prisma.tournament.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return tournaments
  }
  uploadImage = async (tournament_id: string, file: File): Promise<TTournamentVideo[]> => {
    console.log(file)
    const images = this.prisma.tournamentImage.findMany({
      where: { tournament: { id: tournament_id } },
      select: { id: true, url: true },
    })
    return images
  }
  deleteImage = async (tournament_id: string, id: string): Promise<TTournamentVideo[]> => {
    await this.prisma.tournamentImage.delete({ where: { id } })
    const images = this.prisma.tournamentImage.findMany({
      where: { tournament: { id: tournament_id } },
      select: { id: true, url: true },
    })
    return images
  }
  createVideo = async (
    tournament_id: string,
    data: TTournamentVideoCreateProps
  ): Promise<TTournamentVideo[]> => {
    await this.prisma.tournamentVideo.create({
      data: { ...data, tournament: { connect: { id: tournament_id } } },
    })
    const videos = this.prisma.tournamentVideo.findMany({
      where: { tournament: { id: tournament_id } },
      select: { id: true, url: true },
    })
    return videos
  }
  deleteVideo = async (tournament_id: string, id: string): Promise<TTournamentVideo[]> => {
    await this.prisma.tournamentVideo.delete({ where: { id } })
    const videos = this.prisma.tournamentVideo.findMany({
      where: { tournament: { id: tournament_id } },
      select: { id: true, url: true },
    })
    return videos
  }
}
